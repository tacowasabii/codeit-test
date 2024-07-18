// easy.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from "../app/components/SignupForm";

describe('SignupForm', () => {
    beforeEach(() => {
        render(<SignupForm />);
    });

    test('renders all form fields', () => {
        expect(screen.getByLabelText(/id/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('displays error for empty required fields', async () => {
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getAllByText('값을 입력해주세요.')).toHaveLength(4);
        });
    });

    test('validates ID field', async () => {
        const idInput = screen.getByLabelText(/id/i);

        fireEvent.change(idInput, { target: { value: 'abc' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('최소 5자 이상 입력해주세요.')).toBeInTheDocument();
        });

        fireEvent.change(idInput, { target: { value: 'abcdefghijklmnop' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('최대 15자 이하로 입력해주세요.')).toBeInTheDocument();
        });
    });

    test('validates email field', async () => {
        const emailInput = screen.getByLabelText(/email/i);

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('이메일 형식에 맞게 입력해주세요.')).toBeInTheDocument();
        });
    });

    test('validates password field', async () => {
        const passwordInput = screen.getByLabelText(/^password/i);

        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('최소 8자 이상 입력해주세요.')).toBeInTheDocument();
        });

        fireEvent.change(passwordInput, { target: { value: 'verylongpasswordover20chars' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('최대 20자 이하로 입력해주세요.')).toBeInTheDocument();
        });

        fireEvent.change(passwordInput, { target: { value: 'invalid@password' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('영문과 숫자만 입력해주세요.')).toBeInTheDocument();
        });
    });

    test('validates password confirmation', async () => {
        const passwordInput = screen.getByLabelText(/^password/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

        fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'differentpass123' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
        });
    });

    test('submits form with valid data', async () => {
        const mockLocalStorage = {
            getItem: jest.fn(),
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
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('users', expect.any(String));
        });
    });
});
