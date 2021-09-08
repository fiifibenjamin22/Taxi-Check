import 'package:customer_app/presentation/viewmodel/complaint/complaint_view_model.dart';
import 'package:customer_app/presentation/viewmodel/complaint/complaint_view_model_state.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:customer_app/presentation/viewutils/widget/app_dialog.dart';
import 'package:customer_app/utils/strings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class ComplaintScreen extends HookWidget {
  static const id = '/complaint';

  final GlobalKey<State> _keyLoader = new GlobalKey<State>();
  final GlobalKey<State> _keyError = new GlobalKey<State>();
  final reportReasons = [
    "Fake License",
    "Reckless driving",
    "Not the registered driver of the car",
    "Over-speeding",
    "Other",
  ];

  @override
  Widget build(BuildContext context) {
    final reason = useState<String>('');
    final commentController = useTextEditingController();
    final numberPlate = ModalRoute.of(context)!.settings.arguments;

    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.black),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      backgroundColor: Colors.white,
      body: ProviderListener(
        provider: complaintViewModelProvider,
        onChange: (BuildContext context, value) {
          if (_keyLoader.currentContext != null)
            AppDialog.closeDialog(_keyLoader);

          if (value is ReportingDriver)
            AppDialog.showLoadingDialog(context, _keyLoader);

          if (value is FailedReportingDriver) {
            AppDialog.showErrorDialog(context, _keyError, value.message);
          }

          if (value is DriverReported) {
            AppDialog.showDriverReportedDialog(context, _keyError);
          }
        },
        child: ListView(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          children: [
            Text(
              'Report Driver',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
            ),
            SizedBox(height: 5),
            Text(
              'Why are you reporting driver?',
              style: TextStyle(color: Colors.grey),
            ),
            SizedBox(height: 10),
            ListView.builder(
              shrinkWrap: true,
              physics: ClampingScrollPhysics(),
              itemCount: reportReasons.length,
              itemBuilder: (listContext, index) => RadioListTile(
                contentPadding: EdgeInsets.zero,
                activeColor: AppColors.primaryColor,
                value: reportReasons[index],
                groupValue: reason.value,
                onChanged: (val) => reason.value = val.toString(),
                title: Text('${reportReasons[index]}'),
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: commentController,
              decoration: InputDecoration(hintText: 'Leave a comment'),
            ),
            SizedBox(height: 50),
            TextButton(
              onPressed: () {
                if (reason.value.isNotEmpty) {
                  _reportDriver(
                    context,
                    {
                      "vehicle_plate": numberPlate,
                      "reported_by": Strings.userId,
                      "reason": reason.value,
                      "comments": commentController.text,
                      "status": Strings.COMPLAINT_STATUS
                    },
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Please state why you are reporting driver'),
                    ),
                  );
                }
              },
              child: Text('Continue', style: TextStyle(color: Colors.black)),
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
      ),
    );
  }

  _reportDriver(BuildContext context, Map<String, dynamic> params) {
    // print(params);
    context.read(complaintViewModelProvider.notifier).reportDriver(params);
  }
}
