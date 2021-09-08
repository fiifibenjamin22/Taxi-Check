import 'package:equatable/equatable.dart';

abstract class AuthViewModelState extends Equatable {
  const AuthViewModelState();
}

class Unauthorized extends AuthViewModelState {
  const Unauthorized();

  @override
  List<Object> get props => [];
}

class VerifyingPhone extends AuthViewModelState {
  const VerifyingPhone();

  @override
  List<Object> get props => [];
}

class Authorizing extends AuthViewModelState {
  const Authorizing();

  @override
  List<Object> get props => [];
}

class AuthorizationFailed extends AuthViewModelState {
  final String message;

  const AuthorizationFailed(this.message);

  @override
  List<Object> get props => [message];
}

class PhoneVerificationFailed extends AuthViewModelState {
  final String message;

  const PhoneVerificationFailed(this.message);

  @override
  List<Object> get props => [message];
}

class Authorized extends AuthViewModelState {
  final Map<String, dynamic> user;

  const Authorized(this.user);

  @override
  List<Object> get props => [user];
}

class PhoneVerified extends AuthViewModelState {
  const PhoneVerified();

  @override
  List<Object> get props => [];
}
