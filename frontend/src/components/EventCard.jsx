export default function EventCard({ event }) {
    if (!event) return null; // or return a fallback UI
  
    const handleEnroll = async () => {
      const username = localStorage.getItem('username');
      const res = await fetch(`http://localhost:5000/api/events/enroll/${event._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const data = await res.json();
      alert(data.msg);
    };
  
    return (
      <div>
        <h3 className="bg-red-400">{event.title}</h3>
        <p>{event.description}</p>
        <button onClick={handleEnroll}>Enroll</button>
      </div>
    );
  }
  