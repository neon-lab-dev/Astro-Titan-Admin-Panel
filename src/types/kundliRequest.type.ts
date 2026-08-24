/* eslint-disable @typescript-eslint/no-explicit-any */

export type TKundliType =
    | "birthChart"
    | "compatibility"
    | "career"
    | "marriage"
    | "yearly"
    | "love"
    | "health"
    | "finance"
    | "education"
    | "business"
    | "child"
    | "foreignTravel"
    | "property"
    | "doshaAnalysis"
    | "gemstone";

export type TKundliRequest = {
    _id: string;
    userId: any;
    astrologerId?: any;
    requestType: "generateKundli" | "analyzeKundli";

    existingKundliFiles: string[];  // if requestType is "analyzeKundli"

    // User Snapshot
    userName: string;
    userPhoneNumber: string;

    // Birth Details
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
    userGender: "male" | "female" | "other";

    // Kundli
    kundliType: TKundliType;

    userNotes?: string;

    // Status
    status:
    | "pending"
    | "accepted"
    | "completed"
    | "cancelled";

    // Result
    reportUrl: string;

    completedAt?: string;
    cancelledAt?: string;
    createdAt: string;

    isAssigned ?: boolean
};