const API_URLS = {
  rooms: 'https://functions.poehali.dev/a380b5ff-f0a1-4bb8-bf7c-9b5319b56cd3',
  bookings: 'https://functions.poehali.dev/b8683fac-9529-4714-b427-5bd535b5a0c7',
  admin: 'https://functions.poehali.dev/2bd6f014-fa17-4672-8fde-e0ec4f6503b1',
};

export const api = {
  async getRooms(category?: string) {
    const url = category && category !== 'all' 
      ? `${API_URLS.rooms}?category=${category}`
      : API_URLS.rooms;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch rooms');
    return response.json();
  },

  async getBookings(userId?: number, status?: string) {
    let url = API_URLS.bookings;
    const params = new URLSearchParams();
    if (userId) params.append('user_id', userId.toString());
    if (status) params.append('status', status);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  async createBooking(data: {
    roomId: number;
    checkIn: string;
    checkOut: string;
    guestsCount: number;
    guestName: string;
    guestEmail: string;
    guestPhone?: string;
  }) {
    const response = await fetch(API_URLS.bookings, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },

  async updateBooking(bookingId: number, status: string) {
    const response = await fetch(API_URLS.bookings, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, status }),
    });
    if (!response.ok) throw new Error('Failed to update booking');
    return response.json();
  },

  async deleteBooking(bookingId: number) {
    const response = await fetch(API_URLS.bookings, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId }),
    });
    if (!response.ok) throw new Error('Failed to delete booking');
    return response.json();
  },

  async getAdminStats() {
    const response = await fetch(`${API_URLS.admin}/stats`);
    if (!response.ok) throw new Error('Failed to fetch admin stats');
    return response.json();
  },

  async getAdminRooms() {
    const response = await fetch(API_URLS.admin);
    if (!response.ok) throw new Error('Failed to fetch admin rooms');
    return response.json();
  },

  async createRoom(data: {
    name: string;
    category: string;
    price: number;
    area?: number;
    maxGuests: number;
    description?: string;
    features?: string[];
    imageUrl?: string;
  }) {
    const response = await fetch(API_URLS.admin, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create room');
    return response.json();
  },

  async updateRoomStatus(roomId: number, status: string) {
    const response = await fetch(API_URLS.admin, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, status }),
    });
    if (!response.ok) throw new Error('Failed to update room');
    return response.json();
  },

  async deleteRoom(roomId: number) {
    const response = await fetch(API_URLS.admin, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId }),
    });
    if (!response.ok) throw new Error('Failed to delete room');
    return response.json();
  },
};
