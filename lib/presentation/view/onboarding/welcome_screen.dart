import 'package:customer_app/presentation/view/onboarding/auth/mobile_verification_screen.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/utils/strings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class WelcomeScreen extends HookWidget {
  static const id = '/welcome';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.fromLTRB(20, 20, 20, 50),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('${Strings.ImagePath}welcome_bg.png'),
            fit: BoxFit.cover,
          ),
        ),
        child: Column(
          children: [
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text.rich(
                    TextSpan(
                      text: 'Welcome to Taxi Check',
                      children: [
                        TextSpan(
                          text: '\n\nJoin thousands of people who use ' +
                              'Taxi Check to ensure safety in their daily road trips',
                          style: TextStyle(
                            color: AppColors.lighterYellow,
                            fontWeight: FontWeight.normal,
                            fontSize: 14,
                          ),
                        )
                      ],
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 25),
                  TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, MobileVerificationScreen.id);
                    },
                    child: Text(
                      'GET STARTED',
                      style: TextStyle(color: Colors.black),
                    ),
                    style: TextButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 15),
                      backgroundColor: AppColors.primaryColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
