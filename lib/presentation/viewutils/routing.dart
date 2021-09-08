import 'package:customer_app/presentation/view/main/complaint_screen.dart';
import 'package:customer_app/presentation/view/main/home_screen.dart';
import 'package:customer_app/presentation/view/main/vehicle_info_screen.dart';
import 'package:customer_app/presentation/view/onboarding/auth/emergency_contact_screen.dart';
import 'package:customer_app/presentation/view/onboarding/auth/kyc_screen.dart';
import 'package:customer_app/presentation/view/onboarding/auth/login_screen.dart';
import 'package:customer_app/presentation/view/onboarding/auth/mobile_verification_screen.dart';
import 'package:customer_app/presentation/view/onboarding/auth/otp_screen.dart';
import 'package:customer_app/presentation/view/onboarding/splash_screen.dart';
import 'package:customer_app/presentation/view/onboarding/walk_through_screen.dart';
import 'package:customer_app/presentation/view/onboarding/welcome_screen.dart';
import 'package:flutter/cupertino.dart';

class Routing {
  static String get initialRoute => '';

  static Map<String, WidgetBuilder> get routes => {
        SplashScreen.id: (context) => SplashScreen(),
        WalkThroughScreen.id: (context) => WalkThroughScreen(),
        WelcomeScreen.id: (context) => WelcomeScreen(),
        LoginScreen.id: (context) => LoginScreen(),
        MobileVerificationScreen.id: (context) => MobileVerificationScreen(),
        OTPScreen.id: (context) => OTPScreen(),
        KYCScreen.id: (context) => KYCScreen(),
        EmergencyContactScreen.id: (context) => EmergencyContactScreen(),
        HomeScreen.id: (context) => HomeScreen(),
        VehicleInfoScreen.id: (context) => VehicleInfoScreen(),
        ComplaintScreen.id: (context) => ComplaintScreen(),
      };
}
