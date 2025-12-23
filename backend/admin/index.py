"""
API для админпанели
Управление номерами и статистика
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    
    try:
        if method == 'GET':
            path = event.get('path', '')
            
            if '/stats' in path:
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT COUNT(*) as total FROM rooms")
                    total_rooms = cur.fetchone()['total']
                    
                    cur.execute("SELECT COUNT(*) as count FROM rooms WHERE status = 'available'")
                    available_rooms = cur.fetchone()['count']
                    
                    cur.execute("SELECT COUNT(*) as count FROM rooms WHERE status = 'occupied'")
                    occupied_rooms = cur.fetchone()['count']
                    
                    cur.execute("SELECT COUNT(*) as count FROM bookings")
                    total_bookings = cur.fetchone()['count']
                    
                    cur.execute("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'")
                    pending_bookings = cur.fetchone()['count']
                    
                    cur.execute("SELECT COALESCE(SUM(total_price), 0) as revenue FROM bookings WHERE status != 'cancelled'")
                    revenue = cur.fetchone()['revenue']
                    
                    cur.execute("""
                        SELECT rc.name, rc.code, COUNT(r.id) as count
                        FROM room_categories rc
                        LEFT JOIN rooms r ON r.category_id = rc.id
                        GROUP BY rc.id, rc.name, rc.code
                    """)
                    categories_stats = cur.fetchall()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'totalRooms': total_rooms,
                            'availableRooms': available_rooms,
                            'occupiedRooms': occupied_rooms,
                            'totalBookings': total_bookings,
                            'pendingBookings': pending_bookings,
                            'revenue': revenue,
                            'categoriesStats': [dict(stat) for stat in categories_stats]
                        }),
                        'isBase64Encoded': False
                    }
            
            else:
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("""
                        SELECT r.*, rc.name as category_name, rc.code as category_code
                        FROM rooms r
                        LEFT JOIN room_categories rc ON r.category_id = rc.id
                        ORDER BY r.id
                    """)
                    rooms = cur.fetchall()
                    
                    result = []
                    for room in rooms:
                        result.append({
                            'id': room['id'],
                            'name': room['name'],
                            'category': room['category_code'],
                            'categoryName': room['category_name'],
                            'price': room['price_per_night'],
                            'status': room['status'],
                            'area': room['area'],
                            'maxGuests': room['max_guests']
                        })
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'rooms': result}),
                        'isBase64Encoded': False
                    }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            name = body.get('name')
            category_code = body.get('category')
            price = body.get('price')
            area = body.get('area')
            max_guests = body.get('maxGuests', 2)
            description = body.get('description', '')
            features = body.get('features', [])
            image_url = body.get('imageUrl', '')
            
            if not all([name, category_code, price]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT id FROM room_categories WHERE code = %s", (category_code,))
                category = cur.fetchone()
                
                if not category:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Invalid category'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute("""
                    INSERT INTO rooms 
                    (name, category_id, price_per_night, area, max_guests, description, features, image_url)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (name, category['id'], price, area, max_guests, description, features, image_url))
                
                conn.commit()
                room_id = cur.fetchone()['id']
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Room created successfully', 'roomId': room_id}),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            room_id = body.get('roomId')
            status = body.get('status')
            
            if not room_id or not status:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing roomId or status'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE rooms 
                    SET status = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (status, room_id))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Room updated successfully'}),
                    'isBase64Encoded': False
                }
        
        elif method == 'DELETE':
            body = json.loads(event.get('body', '{}'))
            room_id = body.get('roomId')
            
            if not room_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing roomId'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor() as cur:
                cur.execute("DELETE FROM rooms WHERE id = %s", (room_id,))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Room deleted successfully'}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        conn.close()
