import 'package:customer_app/domain/model/walk_through_model.dart';
import 'package:customer_app/presentation/view/onboarding/welcome_screen.dart';
import 'package:customer_app/presentation/viewmodel/walk_through_view_model.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/presentation/viewutils/widget/pager_indicator.dart';
import 'package:customer_app/utils/strings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class WalkThroughScreen extends HookWidget {
  static const id = 'walk_through';

  @override
  Widget build(BuildContext context) {
    final state = useProvider(walkThroughViewModelProvider);

    return Scaffold(
      backgroundColor: AppColors.primaryColor,
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 20, vertical: 30),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              child: Image.asset(
                '${Strings.ImagePath}logo.png',
                width: 200,
                height: 200,
                scale: 2,
              ),
            ),
            Expanded(
              child: PageView.builder(
                itemCount: state.slides.length,
                onPageChanged: (index) {
                  context.read(walkThroughViewModelProvider).changeSlide(index);
                },
                itemBuilder: (context, index) {
                  final WalkThroughModel slide = state.slides[index];

                  return Text.rich(
                    TextSpan(
                      text: slide.description,
                      children: [
                        TextSpan(
                          text: '\n\n${slide.title}',
                          style: TextStyle(
                            color: Colors.white,
                            fontStyle: FontStyle.normal,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                      style: TextStyle(
                        color: AppColors.lighterYellow,
                        fontStyle: FontStyle.italic,
                        fontSize: 16,
                      ),
                    ),
                    textAlign: TextAlign.center,
                  );
                },
              ),
            ),
            Text(
              'Powered by ICODE',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  flex: 1,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: state.slides
                        .asMap()
                        .entries
                        .map<Widget>(
                          (value) => PagerIndicator(
                            isCurrentPage: state.currentSlide == value.key,
                          ),
                        )
                        .toList(),
                  ),
                ),
                SizedBox(width: 30),
                SizedBox(
                  width: 120,
                  child: TextButton(
                    child: Text(
                      state.currentSlide == 1 ? 'GET STARTED' : 'SKIP',
                      style: TextStyle(
                        color: AppColors.lighterYellow,
                        fontSize: 12,
                      ),
                    ),
                    onPressed: () => Navigator.pushNamedAndRemoveUntil(
                      context,
                      WelcomeScreen.id,
                      (route) => false,
                    ),
                    style: TextButton.styleFrom(
                      backgroundColor: Color.fromRGBO(0, 0, 0, .1),
                      padding: EdgeInsets.symmetric(horizontal: 15),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
