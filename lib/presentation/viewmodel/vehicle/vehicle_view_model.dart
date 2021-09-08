import 'package:customer_app/data/repository/vehicle_repository.dart';
import 'package:customer_app/presentation/viewmodel/vehicle/vehicle_view_model_state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final vehicleViewModelProvider = StateNotifierProvider.autoDispose(
  (ref) => VehicleViewModel(ref.watch(vehicleRepositoryProvider)),
);

class VehicleViewModel extends StateNotifier<VehicleViewModelState> {
  final VehicleRepository _vehicleRepository;

  VehicleViewModel(this._vehicleRepository) : super(Idle());

  Future<void> verifyVehicle(String numberPlate) async {
    state = VerifyingVehicle();
    final response = await _vehicleRepository.verifyVehicle(numberPlate);

    response.fold(
      (error) => state = ErrorVerifyingVehicle(error.message),
      (success) => state = VehicleVerified(success['data']),
    );
  }
}
