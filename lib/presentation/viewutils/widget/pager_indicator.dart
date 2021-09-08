import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class PagerIndicator extends HookWidget {
  final bool isCurrentPage;

  PagerIndicator({required this.isCurrentPage});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 3.5),
      height: this.isCurrentPage ? 10.0 : 7.0,
      width: this.isCurrentPage ? 10.0 : 7.0,
      decoration: BoxDecoration(
        color: this.isCurrentPage ? Colors.white : AppColors.lighterYellow,
        borderRadius: BorderRadius.circular(30),
      ),
    );
  }
}
