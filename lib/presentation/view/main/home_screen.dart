import 'package:customer_app/presentation/view/main/vehicle_info_screen.dart';
import 'package:customer_app/presentation/viewmodel/complaint/complaint_view_model.dart';
import 'package:customer_app/presentation/viewmodel/complaint/complaint_view_model_state.dart';
import 'package:customer_app/presentation/viewmodel/vehicle/vehicle_view_model.dart';
import 'package:customer_app/presentation/viewmodel/vehicle/vehicle_view_model_state.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/presentation/viewutils/widget/app_dialog.dart';
import 'package:customer_app/presentation/viewutils/widget/empty_body.dart';
import 'package:customer_app/presentation/viewutils/widget/recent_activity_tile.dart';
import 'package:customer_app/utils/time_helper.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class HomeScreen extends HookWidget {
  static const id = '/home';

  final GlobalKey<State> _keyLoader = new GlobalKey<State>();
  final GlobalKey<State> _keyBottomSheet = new GlobalKey<State>();

  @override
  Widget build(BuildContext context) {
    final plateNumberController = useTextEditingController();

    useEffect(() => _fetchActivities(context), const []);
    final activityState = useProvider(complaintViewModelProvider);

    return Scaffold(
      backgroundColor: AppColors.pageBackground,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: AppColors.darkGrey,
        actions: [IconButton(onPressed: () {}, icon: Icon(Icons.settings))],
      ),
      body: Container(
        child: ProviderListener(
          provider: vehicleViewModelProvider,
          onChange: (BuildContext context, value) {
            if (_keyLoader.currentContext != null)
              AppDialog.closeDialog(_keyLoader);

            if (value is VerifyingVehicle)
              AppDialog.showLoadingDialog(context, _keyLoader);

            if (value is ErrorVerifyingVehicle) {
              AppDialog.showDriverNotFoundDialog(context, _keyBottomSheet);
            }

            if (value is VehicleVerified) {
              Navigator.pushNamed(
                context,
                VehicleInfoScreen.id,
                arguments: value.vehicleDetails,
              );
            }
          },
          child: Column(
            children: [
              Stack(
                children: [
                  Container(
                    color: AppColors.darkGrey,
                    padding: EdgeInsets.fromLTRB(20, 0, 20, 50),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Text(
                          'Hello',
                          style: TextStyle(color: Colors.white),
                        ),
                        Text(
                          TimeHelper.greeter(),
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          'Let’s ensure you are riding safe.',
                          style: TextStyle(color: AppColors.lighterYellow),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    alignment: Alignment.topCenter,
                    padding: EdgeInsets.only(
                      top: MediaQuery.of(context).size.height / 6.2,
                      left: 20,
                      right: 20,
                    ),
                    child: TextField(
                      controller: plateNumberController,
                      decoration: InputDecoration(
                        hintText: 'XX XXX-XX',
                        hintStyle: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: AppColors.lightGrey,
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(50),
                          borderSide: BorderSide(color: Colors.transparent),
                        ),
                        suffixIcon: Padding(
                          padding: EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 3,
                          ),
                          child: TextButton(
                            onPressed: () {
                              _getVehicleInfo(
                                context,
                                plateNumberController.text,
                              );
                            },
                            child: Text(
                              'CHECK',
                              style: TextStyle(color: Colors.black),
                            ),
                            style: TextButton.styleFrom(
                              backgroundColor: AppColors.primaryColor,
                              padding: EdgeInsets.symmetric(horizontal: 20),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.all(20),
                  child: RefreshIndicator(
                    onRefresh: () => Future.delayed(
                        Duration.zero, () => _fetchActivities(context)),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Text(
                          'Recent Activities',
                          style: TextStyle(
                            color: AppColors.darkGrey,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        SizedBox(height: 20),
                        _renderActivities(activityState)
                      ],
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: AppColors.primaryColor,
        foregroundColor: Colors.black,
        child: Icon(Icons.add_a_photo_outlined),
      ),
    );
  }

  _getVehicleInfo(BuildContext context, String carPlate) {
    print(carPlate);
    context.read(vehicleViewModelProvider.notifier).verifyVehicle(carPlate);
  }

  _fetchActivities(BuildContext context) {
    context.read(complaintViewModelProvider.notifier).getActivities();
  }

  Widget _renderActivities(state) {
    if (state is FetchingActivities)
      return Center(child: CircularProgressIndicator());

    if (state is ActivitiesFetched)
      return ListView.builder(
        itemCount: state.activities.length,
        shrinkWrap: true,
        itemBuilder: (ctx, index) => RecentActivityTile(
          state.activities[index],
        ),
      );

    return Expanded(child: EmptyBody());
  }
}
