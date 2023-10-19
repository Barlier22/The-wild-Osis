/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  //   console.log(data);
  return { data };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  //   console.log(data);
  return { data };
}
// the supabase will alwarady  send the session !
export async function getCurrentUser() {
  // get session in logalStorage
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  //   console.log(data);
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  console.log(avatar);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}-${Date.now()}`;

  const { error: errorAvatar } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (errorAvatar) throw new Error(errorAvatar.message);

  const { data: updatedUser, error: errorUpdatinguser } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  //https://jbvybzdrfblvbxpvxglu.supabase.co/storage/v1/object/public/avatars/cabin-008.jpg

  console.log(updatedUser);
  if (errorUpdatinguser) throw new Error(errorUpdatinguser.message);
  return updatedUser;
}
