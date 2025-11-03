import eventService from './eventService';

describe('EventService', () => {
  describe('getAllEvents', () => {
    it('should fetch all events successfully', async () => {
      const events = await eventService.getAllEvents();
      
      expect(events).toHaveLength(2);
      expect(events[0].title).toBe('Beach Cleanup');
      expect(events[1].title).toBe('Park Cleanup');
    });
  });

  describe('createEvent', () => {
    it('should create an event successfully', async () => {
      const eventData = {
        title: 'New Event',
        description: 'Description',
        location: 'Location',
        date: '2024-12-10',
        time: '10:00',
      };
      
      const result = await eventService.createEvent(eventData);
      expect(result.msg).toBe('Event created successfully');
    });
  });

  describe('enrollInEvent', () => {
    it('should enroll user in event successfully', async () => {
      const result = await eventService.enrollInEvent('1', 'testuser');
      expect(result.msg).toBe('Enrollment successful');
    });
  });
});
