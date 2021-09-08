import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class LabelledText extends HookWidget {
  LabelledText({required this.label, required this.text});

  final String label;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text.rich(
      TextSpan(
        text: text,
        children: [
          TextSpan(
            text: '\n$label',
            style: TextStyle(color: Colors.grey, fontSize: 14),
          ),
        ],
        style: TextStyle(color: Colors.white, fontSize: 20),
      ),
      textAlign: TextAlign.center,
    );
  }
}
