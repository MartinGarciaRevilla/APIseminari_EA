import { Request, Response } from 'express';
import {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
    getAlumniBySubject
} from '../subject/subject_service.js';

export const createSubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await createSubject(req.body);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSubjectsHandler = async (_req: Request, res: Response) => {
    try {
        const data = await getAllSubjects();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSubjectByIdHandler = async (req: Request, res: Response) => {
    try {
        const data = await getSubjectById(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await updateSubject(req.params.id, req.body);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await deleteSubject(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAlumniBySubjectHandler = async (req: Request, res: Response) => {
    try {
        const data = await getAlumniBySubject(req.params.id);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};