import 'package:customer_app/data/datasource/remote/api_service.dart';
import 'package:customer_app/domain/error_handlers/failure.dart';
import 'package:either_dart/either.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final vehicleRepositoryProvider = Provider<VehicleRepository>(
  (ref) => VehicleRepositoryImpl(ref.watch(ApiService.apiServiceProvider)),
);

abstract class VehicleRepository {
  Future<Either<Failure, dynamic>> verifyVehicle(String plateNumber);
}

class VehicleRepositoryImpl implements VehicleRepository {
  final ApiService _apiService;

  VehicleRepositoryImpl(this._apiService);

  @override
  Future<Either<Failure, dynamic>> verifyVehicle(String plateNumber) async {
    try {
      final _response = await _apiService.verifyVehicle(plateNumber);

      return Right(_response.body);
    } catch (e) {
      return Left(Failure(e.toString()));
    }
  }
}
