import 'package:equatable/equatable.dart';

abstract class VehicleViewModelState extends Equatable {
  const VehicleViewModelState();
}

class Idle extends VehicleViewModelState {
  const Idle();

  @override
  List<Object> get props => [];
}

class VerifyingVehicle extends VehicleViewModelState {
  const VerifyingVehicle();

  @override
  List<Object> get props => [];
}

class ErrorVerifyingVehicle extends VehicleViewModelState {
  final String message;

  const ErrorVerifyingVehicle(this.message);

  @override
  List<Object> get props => [message];
}

class VehicleVerified extends VehicleViewModelState {
  final Map<String, dynamic> vehicleDetails;

  const VehicleVerified(this.vehicleDetails);

  @override
  List<Object> get props => [vehicleDetails];
}
