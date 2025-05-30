// src/services/user_service.ts
import User, { IUser } from '../users/user_models.js';

export const saveMethod = () => {
    return 'Hola';
};
export const createUser = async (userData: IUser) => {
    const user = new User(userData);
    return await user.save();
};

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserById = async (id: string) => {
    return await User.findById(id);
};

export const updateUser = async (id: string, updateData: Partial<IUser>) => {
    return await User.updateOne({ _id: id }, { $set: updateData });
};

export const deleteUser = async (id: string) => {
    return await User.deleteOne({ _id: id });
};

export const loginUser = async (email: string, password: string): Promise<{ id: string; name: string; email: string; age: number }> => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    if (user.password !== password) {
        throw new Error("Contraseña incorrecta");
    }

    // Devolver los datos del usuario
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        age: user.age, // Incluir la edad
    };
};