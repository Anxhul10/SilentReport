export async function submitReport(
  supabase: any,
  user_id: any,
  title: string,
  description: string,
) {
  try {
    const { data } = await supabase
      .from("reports")
      .insert({ title, description, created_by: user_id })
      .select();
    return data;
  } catch (error) {
    console.log(error);
  }
}
