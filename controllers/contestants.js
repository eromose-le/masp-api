const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const Contestant = require('../models/Contestant');
const { getMaxListeners } = require('../models/Contestant');

// @desc    Get all contestants
// @route   GET /api/v1/contestants
// @access  Public
exports.getContestants = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single contestant
// @route   GET /api/v1/contestant/:id
// @access  Public
exports.getContestant = asyncHandler(async (req, res, next) => {
  const contestant = await Contestant.findById(req.params.id);

  if (!contestant) {
    return next(
      new ErrorResponse(`Contestant not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: contestant
  });
});

// @desc    Create new contestant
// @route   POST /api/v1/contestants
// @access  Private
exports.createContestant = asyncHandler(async (req, res, next) => {
  var { contestantTitle, fullName, userEmail } = req.body;

  const contestant = await Contestant.create({
    contestantTitle,
    fullName,
    userEmail
  });

  const message = `<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      /* FONTS */
      @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }

      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      table {
        border-collapse: collapse !important;
      }
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      /* MOBILE STYLES */
      @media screen and (max-width: 600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }

      /* ANDROID CENTER FIX */
      div[style*='margin: 16px 0;'] {
        margin: 0 !important;
      }
    </style>
  </head>
  <body
    style="
      background-color: #f3f5f7;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <!-- HIDDEN PREHEADER TEXT -->
    <!-- <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        font-family: 'Poppins', sans-serif;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
      We're thrilled to have you here! Get ready to dive into your new account.
    </div> -->

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td align="center">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 40px 10px 10px 10px"
              >
                <!-- <a href="#" target="_blank" style="text-decoration: none">
                  <span
                    style="
                      display: block;
                      font-family: 'Poppins', sans-serif;
                      color: #3e8ef7;
                      font-size: 36px;
                    "
                    border="0"
                    ></span
                  >
                </a> -->
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- HERO -->
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="center"
                valign="top"
                style="
                  padding: 40px 20px 20px 20px;
                  border-radius: 4px 4px 0px 0px;
                  color: #111111;
                  font-family: 'Poppins', sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  letter-spacing: 2px;
                  line-height: 48px;
                "
              >
              <!-- [LOGO] -->
              <!-- <a href="#"><img style="width: 15%" src="#" alt="logo" border="0"></a> -->
                <h1 style="font-size: 36px; font-weight: 600; margin: 0; padding: 10;">
                  Contestant Subscription <span style="color: #2c642b">Recieved!</span
                </h1>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- COPY BLOCK -->
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Poppins', sans-serif;
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0; font-weight: 700">
                  Hi ${fullName}
                </p>
                <br />
                <p style="margin: 0">
                  We recieved your subscription request for <span style="color: #2c642b; font-weight: bold">${contestantTitle} </span> plan from your email: <span style="color: #2c642b; font-weight: bold">${userEmail}</span>, Please be patient while you hear from our team soon.
                </p>
              </td>
            </tr>
            <!-- BULLETPROOF BUTTON -->
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      style="padding: 20px 30px 30px 30px"
                    >
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            align="center"
                            style="border-radius: 3px"
                            bgcolor="#2c642b"
                          >
                            <!-- <p
                              target="_blank"
                              style="
                                font-size: 18px;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #ffffff;
                                text-decoration: none;
                                color: #ffffff;
                                text-decoration: none;
                                padding: 12px 50px;
                                border-radius: 2px;
                                border: 1px solid #2c642b;
                                display: inline-block;
                              "
                              >Your wallet ID :</p
                            > -->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 0px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <!-- <p style="margin: 0">
                  Make a profit today by investing with your broker, We guarantee you a successful trading/contestant experience
                </p> -->
              </td>
            </tr>
            <!-- COPY -->
            
            <!-- COPY -->
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 40px 30px;
                  border-radius: 0px 0px 0px 0px;
                  color: #666666;
                  font-family: 'Poppins', sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 5px 0 30px 0">Cheers,<br /><span style="color: #2c642b">[Website Name]</span</p>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
      </tr>
      <!-- FOOTER -->
      <tr>
        <td align="center" style="padding: 10px 10px 50px 10px">
          <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            
    </table>
  </body>
</html>`;

  const email = [`${userEmail}`, 'erons.a.gberaese@gmail.com'];

  // email.toString();

  try {
    await sendEmail({
      email,
      subject: 'Investor Alert',
      message
    });

    return res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    return next(new ErrorResponse('Email could not be sent', 500));
  }

  res.status(201).json({
    success: true,
    msg: 'Created new Contestant',
    data: contestant
  });
});

// @desc    Update contestant
// @route   PUT /api/v1/contestants/:id
// @access  Private
exports.updateContestant = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  let contestant = await Contestant.findById(req.params.id);

  if (!contestant) {
    return next(
      new ErrorResponse(`Contestant not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is contestant owner or admin
  if (req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this contestant`,
        401
      )
    );
  }

  contestant = await Contestant.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    msg: `Updated contestant ${req.params.id}`,
    data: contestant
  });
});

// @desc    Delete contestant
// @route   DELETE /api/v1/contestants/:id
// @access  Private
exports.deleteContestant = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const contestant = await Contestant.findById(req.params.id);

  if (!contestant) {
    return next(
      new ErrorResponse(`Contestant not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is contestant owner
  if (req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this contestant`,
        401
      )
    );
  }

  contestant.remove();

  res.status(200).json({
    success: true,
    msg: `Deleted contestant ${req.params.id}`,
    data: {}
  });
});
