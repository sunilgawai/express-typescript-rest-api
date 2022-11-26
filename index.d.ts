import express from "express";

// Providing Global appRoot on global interface for the application.
declare global {
    namespace NodeJS {
        interface Global {
            appRoot: string;
        }
    }
}

declare module NodeJS {
    interface Global {
        appRoot: string
    }
}