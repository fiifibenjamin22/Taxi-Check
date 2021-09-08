import 'package:customer_app/data/datasource/local/auth_local_data_source.dart';
import 'package:customer_app/data/datasource/remote/api_service.dart';
import 'package:customer_app/domain/error_handlers/failure.dart';
import 'package:either_dart/either.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final authRepositoryProvider = Provider<AuthRepository>(
  (ref) => AuthRepositoryImpl(ref.watch(ApiService.apiServiceProvider)),
);

abstract class AuthRepository {
  Future<Either<Failure, dynamic>> verifyPhone(String phone);

  Future<Either<Failure, dynamic>> confirmOTP(Map<String, dynamic> params);

  Either<Failure, dynamic> whoami();
}

class AuthRepositoryImpl implements AuthRepository {
  final ApiService _apiService;

  AuthRepositoryImpl(this._apiService);

  @override
  Future<Either<Failure, dynamic>> verifyPhone(String phoneNumber) async {
    try {
      final _response = await _apiService.verifyPhone({'phone': phoneNumber});

      return Right(_response.body);
    } catch (e) {
      return Left(Failure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, dynamic>> confirmOTP(
    Map<String, dynamic> params,
  ) async {
    try {
      final _response = await _apiService.confirmOTP(params);

      AuthLocalDataSource.saveUser(_response.body['data']);

      return Right(_response.body);
    } catch (e) {
      return Left(Failure(e.toString()));
    }
  }

  @override
  Either<Failure, dynamic> whoami() {
    final user = AuthLocalDataSource.getLoggedInUser();

    print("Response:==> $user");

    return user.isEmpty ? Left(Failure('User not authorized')) : Right(user);
  }
}
