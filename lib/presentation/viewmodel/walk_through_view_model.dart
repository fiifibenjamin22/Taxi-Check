import 'package:customer_app/domain/model/walk_through_model.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final walkThroughViewModelProvider = ChangeNotifierProvider(
  (ref) => WalkThroughViewModel(),
);

class WalkThroughViewModel extends ChangeNotifier {
  List<WalkThroughModel> get slides => WalkThroughModel.getSlides();

  int get currentSlide => _currentSlide;
  int _currentSlide = 0;

  void changeSlide(value) {
    _currentSlide = value;
    notifyListeners();
  }
}
