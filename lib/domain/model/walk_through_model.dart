class WalkThroughModel {
  String title;
  String description;

  WalkThroughModel({required this.title, required this.description});

  static List<WalkThroughModel> getSlides() {
    return [
      WalkThroughModel(
        title: 'Safe Transport',
        description:
            'Providing you with safety while\nenjoying commercial transport\nservice wherever you are.....',
      ),
      WalkThroughModel(
        title: 'Just scan and check!',
        description:
            'Ever wondered the identity of the\ndriver or car you boarded ?',
      ),
    ];
  }
}
