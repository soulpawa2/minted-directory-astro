import { settingsSchema, type SettingsSchema} from "@validation/settings";
import configData from "../config/settings.toml";
export default settingsSchema.parse(configData);