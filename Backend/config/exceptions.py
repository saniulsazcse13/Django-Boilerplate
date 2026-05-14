from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        errors = response.data
        if isinstance(errors, dict):
            for field, messages in errors.items():
                if isinstance(messages, list):
                    errors[field] = [str(m) for m in messages]
                else:
                    errors[field] = str(messages)

        response.data = {
            'error': response.data,
            'status_code': response.status_code,
        }
    else:
        response = Response(
            {'error': 'Internal server error', 'status_code': 500},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return response
