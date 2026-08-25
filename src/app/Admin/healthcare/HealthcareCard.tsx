"use client";

import {
  MdDelete,
  MdEdit,
  MdMedicalServices,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";

interface Props {
  name: string;

  photo_url?: string;

  role?: string;

  specialty?: string;

  fields?: string;

  address?: string;

  phone?: string;

  onEdit?: () => void;

  onDelete: () => void;
}

export default function HealthcareCard({
  name,
  photo_url,
  role,
  specialty,
  fields,
  address,
  phone,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
      bg-white
      border
      rounded-3xl
      p-5
      shadow-sm
      hover:shadow-lg
      transition
      "
      dir="rtl"
    >
      {/* Header */}

      <div
        className="
        flex
        justify-between
        items-start
        "
      >
        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          {/* Image */}

          <div
            className="
            w-16
            h-16
            rounded-full
            overflow-hidden
            bg-gray-100
            flex
            items-center
            justify-center
            "
          >
            {photo_url ? (
              <img
                src={photo_url}
                alt={name}
                className="
                w-full
                h-full
                object-cover
                "
              />
            ) : (
              <MdMedicalServices size={30} className="text-teal-600" />
            )}
          </div>

          <div>
            <h3
              className="
              font-bold
              text-gray-800
              text-lg
              "
            >
              {name}
            </h3>

            {role && (
              <p
                className="
                text-sm
                text-teal-600
                mt-1
                "
              >
                {role}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}

        <div
          className="
          flex
          gap-2
          "
        >
          {onEdit && (
            <button
              onClick={onEdit}
              className="
              p-2
              rounded-xl
              bg-blue-50
              text-blue-600
              hover:bg-blue-100
              "
            >
              <MdEdit size={20} />
            </button>
          )}

          <button
            onClick={onDelete}
            className="
            p-2
            rounded-xl
            bg-red-50
            text-red-600
            hover:bg-red-100
            "
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>

      {/* Info */}

      <div
        className="
        mt-5
        space-y-3
        text-sm
        text-gray-600
        "
      >
        {specialty && (
          <p>
            <b>تخصص:</b> {specialty}
          </p>
        )}

        {fields && (
          <p>
            <b>زمینه درمانی:</b> {fields}
          </p>
        )}

        {address && (
          <p
            className="
            flex
            items-center
            gap-2
            "
          >
            <MdLocationOn className="text-red-500" />
            {address}
          </p>
        )}

        {phone && (
          <p
            className="
            flex
            items-center
            gap-2
            "
          >
            <MdPhone className="text-teal-600" />
            {phone}
          </p>
        )}
      </div>
    </div>
  );
}
