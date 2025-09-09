'use client'
type DScolor = { [key: string]: string };

export const ds_colors: DScolor = {
    configLogic: '#F39882',
    worldModel: '#FDDBAA',
    observations: '#D2E7CA',
    communication: '#9ED1EA',
    actions: '#E0C2DC',
    infrastructure: '#000000',
};

export const dimension_color_mapper= (dimension:string)=>{
    if (dimension == "Configuration + Logic"){
        return ds_colors['configLogic'];
    }
    else if (dimension == "World Model"){
        return ds_colors['worldModel'];
    }
    else if (dimension == "Observations"){
        return ds_colors['observations'];
    }
    else if (dimension == "Communication"){
        return ds_colors['communication'];
    }
    else if (dimension == "Actions"){
        return ds_colors['actions'];
    }
    else {
        return ds_colors['infrastructure'];
    }

}