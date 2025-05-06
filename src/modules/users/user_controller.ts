// src/controllers/user_controller.ts
import { saveMethod, createUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser } from '../users/user_service.js';

import express, { Request, Response } from 'express';

export const saveMethodHandler = async (req: Request, res: Response) => {
    try {
        const data = saveMethod();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const data = await createUser(req.body);
        res.status(201).json(data); // El campo _id se incluirá automáticamente
    } catch (error: any) {
        console.error("Error en createUserHandler:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users); // El campo _id se incluirá automáticamente
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const data = await getUserById(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const data = await updateUser(req.params.id, req.body);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const data = await deleteUser(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const loginUserHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validar que se envíen las credenciales
        if (!email || !password) {
            return res.status(400).json({ message: "Es necesario proporcionar email y contraseña" });
        }

        // Llamar al servicio de login
        const user = await loginUser(email, password);

        // Devolver los datos del usuario logueado
        res.status(200).json({
            _id: user.id, // Cambiar a _id
            name: user.name,
            email: user.email,
            age: user.age, // Asegúrate de incluir la edad
        });
    } catch (error: any) {
        console.error("Error en loginUserHandler:", error);
        res.status(401).json({ message: error.message });
    }
};