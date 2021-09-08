import 'package:customer_app/presentation/view/main/home_screen.dart';
import 'package:customer_app/presentation/view/onboarding/walk_through_screen.dart';
import 'package:customer_app/presentation/viewmodel/auth/auth_view_model.dart';
import 'package:customer_app/presentation/viewmodel/auth/auth_view_model_state.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/utils/strings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class SplashScreen extends HookWidget {
  static const id = '/';

  @override
  Widget build(BuildContext context) {
    useEffect(() => _checkAuthStatus(context), const []);

    return Scaffold(
      backgroundColor: AppColors.primaryColor,
      body: ProviderListener(
        provider: authViewModelProvider,
        onChange: (context, state) {
          _navigateTo(
            context,
            state is Authorized ? HomeScreen.id : WalkThroughScreen.id,
          );
        },
        child: Center(
          child: Image.asset('${Strings.ImagePath}logo.png', scale: 2),
        ),
      ),
    );
  }

  _checkAuthStatus(BuildContext context) {
    context.read(authViewModelProvider.notifier).getAuthorizationStatus();
  }

  void _navigateTo(context, String pageId) {
    Navigator.pushNamedAndRemoveUntil(context, pageId, (route) => false);
  }
}
