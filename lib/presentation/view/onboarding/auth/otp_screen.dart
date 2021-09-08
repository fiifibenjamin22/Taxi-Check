import 'package:customer_app/presentation/view/main/home_screen.dart';
import 'package:customer_app/presentation/view/onboarding/auth/kyc_screen.dart';
import 'package:customer_app/presentation/viewmodel/auth/auth_view_model.dart';
import 'package:customer_app/presentation/viewmodel/auth/auth_view_model_state.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/presentation/viewutils/widget/app_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:pin_code_text_field/pin_code_text_field.dart';

class OTPScreen extends HookWidget {
  static const id = '/auth/otp';

  final GlobalKey<State> _keyLoader = new GlobalKey<State>();
  final GlobalKey<State> _keyError = new GlobalKey<State>();

  @override
  Widget build(BuildContext context) {
    final phone = ModalRoute.of(context)!.settings.arguments as String;
    final otp = useTextEditingController();

    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.black),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: ProviderListener(
        provider: authViewModelProvider,
        onChange: (BuildContext context, state) {
          if (_keyLoader.currentContext != null)
            AppDialog.closeDialog(_keyLoader);

          if (state is Authorizing)
            AppDialog.showLoadingDialog(context, _keyLoader);

          if (state is AuthorizationFailed) {
            AppDialog.showErrorDialog(context, _keyError, state.message);
          }

          if (state is Authorized) {
            Navigator.pushNamedAndRemoveUntil(
              context,
              HomeScreen.id,
              (route) => false,
            );
          }

          print(state);
        },
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Column(
            children: [
              Text(
                'Confirm OTP',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 5),
              Text(
                'Please Enter Verification Code Sent to',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.normal,
                  color: AppColors.darkGrey,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 20),
              Text(
                '$phone',
                style: TextStyle(fontSize: 20),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 15),
              Align(
                alignment: Alignment.center,
                child: PinCodeTextField(
                  controller: otp,
                  defaultBorderColor: Colors.transparent,
                  pinBoxColor: AppColors.lighterGrey,
                  pinBoxRadius: 6,
                  hasTextBorderColor: AppColors.primaryColor,
                  onTextChanged: print,
                  onDone: (code) => _confirmOTP(context, phone, code),
                  pinBoxWidth: 50,
                  pinBoxHeight: 60,
                  pinTextStyle: TextStyle(fontSize: 22.0),
                  keyboardType: TextInputType.number,
                ),
              ),
              TextButton(
                onPressed: () {},
                child: Text(
                  'Resend code',
                  style: TextStyle(color: AppColors.primaryColor),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  _confirmOTP(BuildContext context, String phoneNumber, String otp) {
    // print({'phone': phoneNumber, 'otp': otp});
    context.read(authViewModelProvider.notifier).confirmOTP(
      {'phone': phoneNumber, 'otp': otp},
    );
  }
}
