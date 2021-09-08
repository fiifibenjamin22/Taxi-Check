class NetworkException implements Exception {}

class InvalidCredentialsException implements Exception {
  final String message;

  InvalidCredentialsException(this.message);

  @override
  String toString() => message;
}

class ApiException implements Exception {
  final String message;

  ApiException(this.message);

  @override
  String toString() => message;
}

class TokenExpiredException implements Exception {}
