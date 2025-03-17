import express from 'express';
import {
    createSubjectHandler,
    getAllSubjectsHandler,
    getSubjectByIdHandler,
    updateSubjectHandler,
    deleteSubjectHandler,
    getAlumniBySubjectHandler
} from './subject_controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/subjects:
 *   post:
 *     summary: Crear una nueva asignatura
 *     tags:
 *       - Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               teacher:
 *                 type: string
 *               alumni:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Asignatura creada exitosamente
 */
router.post('/subjects', createSubjectHandler);

/**
 * @openapi
 * /api/subjects:
 *   get:
 *     summary: Obtener todas las asignaturas
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: Lista de asignaturas
 */
router.get('/subjects', getAllSubjectsHandler);

/**
 * @openapi
 * /api/subjects/{id}:
 *   get:
 *     summary: Obtener una asignatura por ID
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la asignatura
 *       404:
 *         description: Asignatura no encontrada
 */
router.get('/subjects/:id', getSubjectByIdHandler);

/**
 * @openapi
 * /api/subjects/{id}:
 *   put:
 *     summary: Actualizar una asignatura por ID
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               teacher:
 *                 type: string
 *               alumni:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Asignatura actualizada exitosamente
 */
router.put('/subjects/:id', updateSubjectHandler);

/**
 * @openapi
 * /api/subjects/{id}:
 *   delete:
 *     summary: Eliminar una asignatura por ID
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asignatura eliminada exitosamente
 *       404:
 *         description: Asignatura no encontrada
 */
router.delete('/subjects/:id', deleteSubjectHandler);

/**
 * @openapi
 * /api/subjects/{id}/alumni:
 *   get:
 *     summary: Obtener todos los alumnos de una asignatura
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de alumnos inscritos en la asignatura
 */
router.get('/subjects/:id/alumni', getAlumniBySubjectHandler);

export default router;