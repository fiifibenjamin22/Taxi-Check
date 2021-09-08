import 'package:equatable/equatable.dart';

abstract class ComplaintViewModelState extends Equatable {
  const ComplaintViewModelState();
}

class Idle extends ComplaintViewModelState {
  const Idle();

  @override
  List<Object> get props => [];
}

class ReportingDriver extends ComplaintViewModelState {
  const ReportingDriver();

  @override
  List<Object> get props => [];
}

class FetchingActivities extends ComplaintViewModelState {
  const FetchingActivities();

  @override
  List<Object> get props => [];
}

class FailedReportingDriver extends ComplaintViewModelState {
  final String message;

  const FailedReportingDriver(this.message);

  @override
  List<Object> get props => [message];
}

class FailedFetchingActivities extends ComplaintViewModelState {
  final String message;

  const FailedFetchingActivities(this.message);

  @override
  List<Object> get props => [message];
}

class DriverReported extends ComplaintViewModelState {
  const DriverReported();

  @override
  List<Object> get props => [];
}

class ActivitiesFetched extends ComplaintViewModelState {
  final List activities;

  const ActivitiesFetched(this.activities);

  @override
  List<Object> get props => [activities];
}
