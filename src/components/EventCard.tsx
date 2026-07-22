"use client";

import { type EventInfo, updateEvent } from "@/app/auth/actions";
import { useState, useEffect } from "react";

const formatDateTimeLocal = (
  value: Date | string | number | null | undefined,
) => {
  if (value === null || value === undefined) return "";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 16);
};

const EventCard: React.FC<{
  eventData: EventInfo;
  possiblePois: { id: number; name: string }[];
  canEdit: boolean;
}> = ({ eventData, possiblePois, canEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  // current state for optimistic updates
  const [eventCurrent, setEventCurrent] = useState(eventData);
  const handleEditClick = () => {
    if (canEdit) {
      setIsEditing(true);
    }
  };
  const handleSaveClick = () => {
    const updatedEvent = {
      ...eventCurrent,
      name: (document.getElementById("event-name") as HTMLInputElement).value,
      description: (
        document.getElementById("event-description") as HTMLInputElement
      ).value,
      location_id: parseInt(
        (document.getElementById("event-location") as HTMLSelectElement).value,
      ),
      start_time: new Date(
        (document.getElementById("event-start") as HTMLInputElement).value,
      ),
      end_time: new Date(
        (document.getElementById("event-end") as HTMLInputElement).value,
      ),
    };
    setEventCurrent(updatedEvent);
    setIsEditing(false);
    updateEvent(updatedEvent).catch((error) => {
      console.error("Error updating event:", error);
      setEventCurrent(eventData);
    });
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="relative mx-auto w-full max-w-3xl rounded-[2rem] border border-[#d8daf5] bg-[var(--background)] p-6 text-[var(--foreground)] shadow-[0_24px_80px_rgba(1,0,87,0.08)] sm:p-8 lg:p-10 flex">
        <img
          className="h-32 w-32 rounded-[1.8rem] object-cover min-w-[8rem] mr-4"
          src={
            eventCurrent.image ||
            "https://vuzztqqotrwqqkmvnlxw.supabase.co/storage/v1/object/public/carousel/IMG_5618.avif"
          }
        />
        <div className="flex flex-col gap-1">
          <h3>{eventCurrent.name}</h3>
          <p>{eventCurrent.description}</p>
          <p>@ {eventCurrent.location_name}</p>
          <p>
            {eventCurrent.start_time.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            to{" "}
            {eventCurrent.end_time.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <button
          onClick={handleEditClick}
          className="rounded-full bg-blue-500 px-4 py-2 text-white absolute top-2 right-2"
        >
          Edit
        </button>
      </div>
    );
  } else {
    return (
      <div className="relative mx-auto w-full max-w-3xl rounded-[2rem] border border-[#d8daf5] bg-[var(--background)] p-6 text-[var(--foreground)] shadow-[0_24px_80px_rgba(1,0,87,0.08)] sm:p-8 lg:p-10 flex gap-2">
        <img
          className="h-32 w-32 rounded-[1.8rem] object-cover"
          src={
            eventData.image ||
            "https://vuzztqqotrwqqkmvnlxw.supabase.co/storage/v1/object/public/carousel/IMG_5618.avif"
          }
        />
        <div className="flex flex-col gap-1">
          <input id="event-name" type="text" defaultValue={eventData.name} />
          <input
            id="event-description"
            type="text"
            defaultValue={eventData.description}
          />
          <select
            id="event-location"
            defaultValue={eventData.location_id}
            className="border border-[#d8daf5] rounded-md p-1"
          >
            {possiblePois.map((poi) => (
              <option key={poi.id} value={poi.id}>
                {poi.name}
              </option>
            ))}
          </select>
          <div className="flex gap-1 flex-row">
            <input
              id="event-start"
              type="datetime-local"
              defaultValue={formatDateTimeLocal(eventData.start_time)}
            />{" "}
            to{" "}
            <input
              id="event-end"
              type="datetime-local"
              defaultValue={formatDateTimeLocal(eventData.end_time)}
            />
          </div>
        </div>
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={handleCancelClick}
            className="rounded-full bg-gray-300 px-4 py-2 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="rounded-full bg-blue-500 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    );
  }
};

export default EventCard;
