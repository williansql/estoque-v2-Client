export function getErrorMessage(form: any, field: string) {
    const fieldError = form.get(field)?.errors;

    if (fieldError?.['required']) {
        return 'Campo obrigatório';
    }

    if (fieldError?.['minlength']) {
        return `Campo deve ter pelo menos ${fieldError['minlength'].requiredLength} caracteres`;
    }

    if (fieldError?.['maxlength']) {
        return `Campo deve ter no máximo ${fieldError['maxlength'].requiredLength} caracteres`;
    }

    if (fieldError?.['pattern']) {
        return 'Campo deve conter apenas números';
    }

    if (fieldError?.['email']) {
        return 'Campo deve ser um e-mail válido';
    }
    return '';
}