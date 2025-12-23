"""
API для работы с бронированиями
Создание, получение и управление бронированиями
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            user_id = query_params.get('user_id')
            status = query_params.get('status')
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query = """
                    SELECT b.*, r.name as room_name, r.image_url as room_image
                    FROM bookings b
                    LEFT JOIN rooms r ON b.room_id = r.id
                    WHERE 1=1
                """
                params = []
                
                if user_id:
                    query += " AND b.user_id = %s"
                    params.append(int(user_id))
                
                if status:
                    query += " AND b.status = %s"
                    params.append(status)
                
                query += " ORDER BY b.created_at DESC"
                
                cur.execute(query, params)
                bookings = cur.fetchall()
                
                result = []
                for booking in bookings:
                    result.append({
                        'id': booking['id'],
                        'roomId': booking['room_id'],
                        'roomName': booking['room_name'],
                        'roomImage': booking['room_image'],
                        'checkIn': booking['check_in'].isoformat(),
                        'checkOut': booking['check_out'].isoformat(),
                        'guestsCount': booking['guests_count'],
                        'totalPrice': booking['total_price'],
                        'status': booking['status'],
                        'guestName': booking['guest_name'],
                        'guestEmail': booking['guest_email'],
                        'guestPhone': booking['guest_phone'],
                        'notes': booking['notes'],
                        'createdAt': booking['created_at'].isoformat()
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'bookings': result}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            room_id = body.get('roomId')
            check_in = body.get('checkIn')
            check_out = body.get('checkOut')
            guests_count = body.get('guestsCount', 2)
            guest_name = body.get('guestName')
            guest_email = body.get('guestEmail')
            guest_phone = body.get('guestPhone')
            
            if not all([room_id, check_in, check_out, guest_name, guest_email]):
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
                cur.execute("SELECT price_per_night FROM rooms WHERE id = %s", (room_id,))
                room = cur.fetchone()
                
                if not room:
                    return {
                        'statusCode': 404,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Room not found'}),
                        'isBase64Encoded': False
                    }
                
                check_in_date = datetime.fromisoformat(check_in)
                check_out_date = datetime.fromisoformat(check_out)
                nights = (check_out_date - check_in_date).days
                total_price = room['price_per_night'] * nights
                
                cur.execute("""
                    INSERT INTO bookings 
                    (room_id, check_in, check_out, guests_count, total_price, 
                     guest_name, guest_email, guest_phone, status)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (room_id, check_in, check_out, guests_count, total_price,
                      guest_name, guest_email, guest_phone, 'pending'))
                
                conn.commit()
                booking_id = cur.fetchone()['id']
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'message': 'Booking created successfully',
                        'bookingId': booking_id,
                        'totalPrice': total_price
                    }),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            booking_id = body.get('bookingId')
            status = body.get('status')
            
            if not booking_id or not status:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing bookingId or status'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE bookings 
                    SET status = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (status, booking_id))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Booking updated successfully'}),
                    'isBase64Encoded': False
                }
        
        elif method == 'DELETE':
            body = json.loads(event.get('body', '{}'))
            booking_id = body.get('bookingId')
            
            if not booking_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing bookingId'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor() as cur:
                cur.execute("DELETE FROM bookings WHERE id = %s", (booking_id,))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'message': 'Booking deleted successfully'}),
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
