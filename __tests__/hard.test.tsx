// hard.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import bcrypt from 'bcryptjs';
import SignupForm from "../app/components/SignupForm";

jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('SignupForm Additional Features', () => {
    beforeEach(() => {
        render(<SignupForm />);
    });

    test('prevents signup with existing email', async () => {
        const mockLocalStorage = {
            getItem: jest.fn().mockReturnValue(JSON.stringify([
                { email: 'existing@example.com' }
            ])),
            setItem: jest.fn(),
        };
        Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

        fireEvent.change(screen.getByLabelText(/id/i), { target: { value: 'validid' } });
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'existing@example.com' } });
        fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'validpass123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'validpass123' } });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('이미 존재하는 이메일입니다.')).toBeInTheDocument();
        });

        expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });

    test('stores hashed password in localStorage', async () => {
        const mockLocalStorage = {
            getItem: jest.fn().mockReturnValue(null),
            setItem: jest.fn(),
        };
        Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

        fireEvent.change(screen.getByLabelText(/id/i), { target: { value: 'validid' } });
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'validpass123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'validpass123' } });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(bcrypt.hash).toHaveBeenCalledWith('validpass123', expect.any(Number));
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('users', expect.stringContaining('hashedPassword'));
        });
    });
});