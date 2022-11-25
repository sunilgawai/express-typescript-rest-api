import express from "express";

// Providing Global Path for the application.
declare global {
    namespace NodeJS {
        interface Global {
            appRoot: string;
        }
    }
}