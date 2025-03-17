import { Router } from 'express';
import SubjectController from './subject_controller';

const router = Router();
const subjectController = new SubjectController();

// CRUD routes for subjects
router.post('/', subjectController.createSubject.bind(subjectController));
router.get('/', subjectController.getAllSubjects.bind(subjectController));
router.get('/:id', subjectController.getSubjectById.bind(subjectController));
router.put('/:id', subjectController.updateSubject.bind(subjectController));
router.delete('/:id', subjectController.deleteSubject.bind(subjectController));

// Route to get all users enrolled in a specific subject
router.get('/:id/alumni', subjectController.getEnrolledUsers.bind(subjectController));

export default router;