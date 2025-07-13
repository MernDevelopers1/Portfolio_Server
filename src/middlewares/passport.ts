import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.serializeUser((user: Express.User, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID!,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
//       callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
//       profileFields: ["id", "emails", "name"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log("accessToken :>> ", accessToken);
//       console.log("refreshToken :>> ", refreshToken);
//       console.log("profile :>> ", profile);
//       done(null, profile);
//     }
//   )
// );

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (error: any, user?: Express.User | false | null) => void
    ) => {
      console.log("accessToken :>> ", accessToken);
      console.log("refreshToken :>> ", refreshToken);
      console.log("profile :>> ", profile);
      done(null, profile);
    }
  )
);
