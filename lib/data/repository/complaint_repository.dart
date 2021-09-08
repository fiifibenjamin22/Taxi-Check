import 'package:customer_app/data/datasource/remote/api_service.dart';
import 'package:customer_app/domain/error_handlers/failure.dart';
import 'package:customer_app/utils/strings.dart';
import 'package:either_dart/either.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final complaintRepositoryProvider = Provider<ComplaintRepository>(
  (ref) => ComplaintRepositoryImpl(ref.watch(ApiService.apiServiceProvider)),
);

abstract class ComplaintRepository {
  Future<Either<Failure, dynamic>> reportDriver(Map<String, dynamic> params);

  Future<Either<Failure, dynamic>> getActivities();
}

class ComplaintRepositoryImpl implements ComplaintRepository {
  final ApiService _apiService;

  ComplaintRepositoryImpl(this._apiService);

  @override
  Future<Either<Failure, dynamic>> reportDriver(
    Map<String, dynamic> params,
  ) async {
    try {
      final _response = await _apiService.reportDriver(params);

      return Right(_response.body);
    } catch (e) {
      return Left(Failure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, dynamic>> getActivities() async {
    try {
      final _response = await _apiService.activities(Strings.userId);

      print("Kill it=======>${_response.body}");

      return Right(_response.body);
    } catch (e) {
      return Left(Failure(e.toString()));
    }
  }
}
