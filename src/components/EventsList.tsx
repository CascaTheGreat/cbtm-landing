"use client";

import { useState, useEffect } from "react";
import EventCard from "./EventCard";

import {
  type EventInfo,
  getUserEvents,
  getVisibleLocations,
} from "@/app/auth/actions";

const EventsList: React.FC<{ userId: number }> = ({ userId }) => {
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [possiblePois, setPossiblePois] = useState<
    { id: number; name: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // We need events for initial render
        const eventsData = await getUserEvents(userId);
        setEvents(eventsData);
        // Pois are only visible if the user hits the edit button, but we load optimistically here to avoid refetching on every edited component in a session
        const poisData = getVisibleLocations().then((data) => {
          setPossiblePois(data);
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userId]);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (events.length === 0) {
    return <p>No upcoming events.</p>;
  }

  return (
    <ul className="mt-4 list-disc">
      {events.map((event) => (
        <EventCard
          key={event.id}
          eventData={event}
          possiblePois={possiblePois}
          canEdit={true}
        />
      ))}
    </ul>
  );
};

export default EventsList;
