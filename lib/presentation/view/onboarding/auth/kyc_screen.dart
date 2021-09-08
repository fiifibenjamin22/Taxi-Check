import 'package:customer_app/presentation/view/onboarding/auth/emergency_contact_screen.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class KYCScreen extends HookWidget {
  static const id = '/auth/kyc';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.all(20),
        child: ListView(
          children: [
            Text(
              'Complete Registration',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 5),
            Text(
              'Tell us about yourself. We need this info to be able to\npersonalise communications like email.',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.normal,
                color: AppColors.darkGrey,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 30),
            CircleAvatar(backgroundColor: AppColors.lighterGrey, radius: 50),
            SizedBox(height: 20),
            Text(
              'PERSONAL INFORMATION',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 5),
            Form(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  TextFormField(
                    decoration: InputDecoration(hintText: 'FULL NAME'),
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    decoration: InputDecoration(hintText: 'EMAIL'),
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    decoration: InputDecoration(hintText: 'PASSWORD'),
                  ),
                  SizedBox(height: 10),
                  TextFormField(
                    decoration: InputDecoration(hintText: 'CONFIRM PASSWORD'),
                  ),
                  SizedBox(height: 25),
                  TextButton(
                    onPressed: () => Navigator.pushNamedAndRemoveUntil(
                      context,
                      EmergencyContactScreen.id,
                      (route) => false,
                    ),
                    child: Text(
                      'REGISTER',
                      style: TextStyle(color: Colors.black),
                    ),
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
            )
          ],
        ),
      ),
    );
  }
}
