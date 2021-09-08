import 'package:customer_app/presentation/view/main/home_screen.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class EmergencyContactScreen extends HookWidget {
  static const id = '/auth/emergency_contact';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.all(20),
        child: ListView(
          children: [
            Text(
              'Emergency contact information',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 5),
            Text(
              'Specify a person we can contact if there is an emergency \nor in situations you need to share your trip info',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.normal,
                color: AppColors.darkGrey,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 30),
            Text(
              'EMERGENCY CONTACT INFORMATION',
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
                    decoration: InputDecoration(hintText: 'PHONE'),
                  ),
                  SizedBox(height: 25),
                  TextButton(
                    onPressed: () => Navigator.pushNamedAndRemoveUntil(
                      context,
                      HomeScreen.id,
                      (route) => false,
                    ),
                    child: Text(
                      'CONTINUE',
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
