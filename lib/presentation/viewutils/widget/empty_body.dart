import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class EmptyBody extends HookWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.history, size: 80, color: Colors.grey[400]),
        SizedBox(height: 5),
        Text(
          'All activities will be shown here',
          style: TextStyle(color: Colors.grey),
        )
      ],
    );
  }
}
