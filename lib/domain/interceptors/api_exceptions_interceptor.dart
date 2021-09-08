import 'dart:async';
import 'dart:convert';

import 'package:chopper/chopper.dart';
import 'package:customer_app/domain/error_handlers/exceptions.dart';

class ApiExceptionsInterceptor implements ResponseInterceptor {
  @override
  FutureOr<Response> onResponse(Response response) {
    print("Response from :============> ${response.error}");

    final error = jsonDecode(response.error.toString());

    if (response.statusCode == 401)
      throw InvalidCredentialsException(error['message']);

    if (!response.isSuccessful) throw ApiException(error['message']);

    return response;
  }
}
