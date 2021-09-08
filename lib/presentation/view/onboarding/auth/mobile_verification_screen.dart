import 'package:country_code_picker/country_code_picker.dart';
import 'package:customer_app/presentation/view/onboarding/auth/otp_screen.dart';
import 'package:customer_app/presentation/viewmodel/auth/auth_view_model.dart';
import 'package:customer_app/presentation/viewmodel/auth/auth_view_model_state.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/presentation/viewutils/widget/app_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class MobileVerificationScreen extends HookWidget {
  static const id = '/auth/mobile_verification';

  final GlobalKey<State> _keyLoader = new GlobalKey<State>();
  final GlobalKey<State> _keyError = new GlobalKey<State>();

  @override
  Widget build(BuildContext context) {
    final countryCode = useState('+233');
    final phoneNumber = useTextEditingController();

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

          if (state is VerifyingPhone)
            AppDialog.showLoadingDialog(context, _keyLoader);

          if (state is PhoneVerificationFailed) {
            AppDialog.showErrorDialog(context, _keyError, state.message);
          }

          if (state is PhoneVerified) {
            Navigator.pushNamed(
              context,
              OTPScreen.id,
              arguments: '${countryCode.value+phoneNumber.text}',
            );
          }

          print(state);
        },
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: ListView(
            children: [
              Text(
                'Mobile Verification',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 5),
              Text(
                'Let’s begin with your phone number.',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.normal,
                  color: AppColors.darkGrey,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 30),
              Text(
                'PHONE NUMBER',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 5),
              TextField(
                controller: phoneNumber,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                  hintText: 'eg. 2XXXXXX no leading 0',
                  prefixIcon: CountryCodePicker(
                    onChanged: (val) => countryCode.value = val.dialCode!,
                    initialSelection: 'GH',
                    favorite: ['+233', 'GH'],
                    countryFilter: ['GH'],
                    flagDecoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(5),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 15),
              TextButton(
                onPressed: () => _verifyPhoneNumber(
                  context,
                  '${countryCode.value + phoneNumber.text}',
                ),
                child: Text('VERIFY', style: TextStyle(color: Colors.black)),
                style: TextButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 15),
                  backgroundColor: AppColors.primaryColor,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  _verifyPhoneNumber(BuildContext context, String phone) {
    print(phone);
    context.read(authViewModelProvider.notifier).verifyPhone(phone);
  }
}
