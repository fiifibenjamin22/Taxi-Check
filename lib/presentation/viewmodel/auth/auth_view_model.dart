import 'package:customer_app/data/repository/auth_repository.dart';
import 'package:customer_app/presentation/viewmodel/auth/auth_view_model_state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final authViewModelProvider = StateNotifierProvider.autoDispose(
  (ref) => AuthViewModel(ref.watch(authRepositoryProvider)),
);

class AuthViewModel extends StateNotifier<AuthViewModelState> {
  final AuthRepository _authRepository;

  AuthViewModel(this._authRepository) : super(Unauthorized());

  Future<void> verifyPhone(String phone) async {
    state = VerifyingPhone();
    final response = await _authRepository.verifyPhone(phone);

    response.fold(
      (error) => state = PhoneVerificationFailed(error.message),
      (success) => state = PhoneVerified(),
    );
  }

  Future<void> confirmOTP(Map<String, dynamic> params) async {
    state = Authorizing();
    final response = await _authRepository.confirmOTP(params);
    print(response);
    response.fold(
      (error) => state = AuthorizationFailed(error.message),
      (success) => state = Authorized(success),
    );
  }

  Future<void> getAuthorizationStatus() async {
    final response = _authRepository.whoami();
    Future.delayed(Duration(seconds: 3), () {
      response.fold(
        (error) => state = Unauthorized(),
        (success) => state = Authorized(success),
      );
    });
  }
}
