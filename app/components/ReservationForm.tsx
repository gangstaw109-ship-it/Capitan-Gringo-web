"use client";

import { FormEvent, useState } from "react";
import { site, tours } from "../content/site";

export function ReservationForm({ defaultTour = "" }: { defaultTour?: string }) {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "Hola Capitán Gringo, quiero solicitar una reserva.",
      "",
      `Nombre de la reserva: ${data.get("name")}`,
      `Teléfono disponible: ${data.get("phone")}`,
      `Hotel: ${data.get("hotel")}`,
      `Adultos: ${data.get("adults")}`,
      `Niños: ${data.get("children") || "0"}`,
      `Llegada al hotel: ${data.get("arrival")}`,
      `Salida del hotel: ${data.get("departure")}`,
      `Excursión: ${data.get("tour")}`,
      `Comentario: ${data.get("notes") || "Sin comentario adicional"}`,
    ];

    setStatus("Abriendo WhatsApp con los datos de tu solicitud…");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="reservation-form" onSubmit={submit}>
      <div className="field field-wide">
        <label htmlFor="name">Nombre de la reserva</label>
        <input id="name" name="name" autoComplete="name" required placeholder="Igual que en la reserva del hotel" />
      </div>
      <div className="field">
        <label htmlFor="phone">Teléfono disponible</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="Incluye el código de país" />
      </div>
      <div className="field">
        <label htmlFor="hotel">Hotel</label>
        <input id="hotel" name="hotel" required placeholder="Nombre de tu alojamiento" />
      </div>
      <div className="field compact-field">
        <label htmlFor="adults">Adultos</label>
        <input id="adults" name="adults" type="number" min="1" defaultValue="2" required />
      </div>
      <div className="field compact-field">
        <label htmlFor="children">Niños</label>
        <input id="children" name="children" type="number" min="0" defaultValue="0" />
      </div>
      <div className="field">
        <label htmlFor="arrival">Llegada al hotel</label>
        <input id="arrival" name="arrival" type="date" required />
      </div>
      <div className="field">
        <label htmlFor="departure">Salida del hotel</label>
        <input id="departure" name="departure" type="date" required />
      </div>
      <div className="field field-wide">
        <label htmlFor="tour">Excursión</label>
        <select id="tour" name="tour" defaultValue={defaultTour} required>
          <option value="" disabled>Elige una excursión</option>
          {tours.map((tour) => (
            <option key={tour.slug} value={tour.name}>{tour.name}</option>
          ))}
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="notes">Comentario opcional</label>
        <textarea id="notes" name="notes" rows={4} placeholder="Cuéntanos cualquier necesidad o pregunta" />
      </div>
      <div className="field-wide form-action">
        <button className="button button-primary button-large" type="submit">
          Continuar en WhatsApp <span aria-hidden="true">→</span>
        </button>
        <p>Al continuar se abrirá WhatsApp. Esta web no almacena los datos del formulario.</p>
        <div className="form-status" role="status" aria-live="polite">{status}</div>
      </div>
    </form>
  );
}

