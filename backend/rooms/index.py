"""
API для работы с номерами отеля
Получение списка номеров с фильтрацией по категориям
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
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters') or {}
    category = query_params.get('category', 'all')
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            if category == 'all':
                cur.execute("""
                    SELECT r.*, rc.code as category_code, rc.name as category_name
                    FROM rooms r
                    LEFT JOIN room_categories rc ON r.category_id = rc.id
                    ORDER BY r.price_per_night ASC
                """)
            else:
                cur.execute("""
                    SELECT r.*, rc.code as category_code, rc.name as category_name
                    FROM rooms r
                    LEFT JOIN room_categories rc ON r.category_id = rc.id
                    WHERE rc.code = %s
                    ORDER BY r.price_per_night ASC
                """, (category,))
            
            rooms = cur.fetchall()
            
            result = []
            for room in rooms:
                result.append({
                    'id': room['id'],
                    'name': room['name'],
                    'category': room['category_code'],
                    'categoryName': room['category_name'],
                    'price': room['price_per_night'],
                    'area': room['area'],
                    'guests': room['max_guests'],
                    'description': room['description'],
                    'features': room['features'] or [],
                    'image': room['image_url'],
                    'status': room['status']
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
    finally:
        conn.close()
