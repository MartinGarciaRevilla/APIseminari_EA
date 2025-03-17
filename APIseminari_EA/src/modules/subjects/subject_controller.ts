import { Request, Response } from 'express';
import SubjectService from './subject_service';

class SubjectController {
    async createSubject(req: Request, res: Response) {
        try {
            const subject = await SubjectService.createSubject(req.body);
            res.status(201).json(subject);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllSubjects(req: Request, res: Response) {
        try {
            const subjects = await SubjectService.getAllSubjects();
            res.status(200).json(subjects);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSubjectById(req: Request, res: Response) {
        try {
            const subject = await SubjectService.getSubjectById(req.params.id);
            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.status(200).json(subject);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSubject(req: Request, res: Response) {
        try {
            const updatedSubject = await SubjectService.updateSubject(req.params.id, req.body);
            if (!updatedSubject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.status(200).json(updatedSubject);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteSubject(req: Request, res: Response) {
        try {
            const deletedSubject = await SubjectService.deleteSubject(req.params.id);
            if (!deletedSubject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getEnrolledUsers(req: Request, res: Response) {
        try {
            const users = await SubjectService.getEnrolledUsers(req.params.id);
            if (!users) {
                return res.status(404).json({ message: 'Subject not found or no users enrolled' });
            }
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new SubjectController();