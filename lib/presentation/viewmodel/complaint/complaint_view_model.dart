import 'package:customer_app/data/repository/complaint_repository.dart';
import 'package:customer_app/presentation/viewmodel/complaint/complaint_view_model_state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final complaintViewModelProvider = StateNotifierProvider.autoDispose(
  (ref) => ComplaintViewModel(ref.watch(complaintRepositoryProvider)),
);

class ComplaintViewModel extends StateNotifier<ComplaintViewModelState> {
  final ComplaintRepository _complaintRepository;

  ComplaintViewModel(this._complaintRepository) : super(Idle());

  Future<void> reportDriver(Map<String, dynamic> params) async {
    state = ReportingDriver();
    final response = await _complaintRepository.reportDriver(params);

    response.fold(
      (error) => state = FailedReportingDriver(error.message),
      (success) => state = DriverReported(),
    );
  }

  Future<void> getActivities() async {
    state = FetchingActivities();
    final response = await _complaintRepository.getActivities();

    response.fold(
      (error) => state = FailedFetchingActivities(error.message),
      (success) => state = ActivitiesFetched(success['data']),
    );
  }
}
